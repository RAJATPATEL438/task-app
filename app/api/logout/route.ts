export default function GET(request: Request) {
    const headers = new Headers();
    headers.append('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0;`);
    return Response.json({ message: 'Logged out successfully' }, { status: 200, headers });
}