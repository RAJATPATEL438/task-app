import '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: 'User already exists' }, { status: 409 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return Response.json({ message: 'Signup successful'}, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({ message: 'Internal server error'}, { status: 500 });
  }
}
