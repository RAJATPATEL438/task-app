import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try{
        const userId = await getDataFromToken(request);
        const user= await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ data:user }, { status: 200 });
    }catch (error:any) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
    }
}