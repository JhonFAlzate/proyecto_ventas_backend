import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Usuarios } from "../../data";


export class AuthMiddleware{

    static async protected(req:Request, res:Response, next:NextFunction){
        const authorization = req.header("Authorization");

        if(!authorization)return res.status(401).json({ message: "No token provided" });

        if(!authorization.startsWith("Bearer ")) return res.status(401).json({message :  "Invalid token, values in Bearer"});

        const token = authorization.split(" ")[1];

        const payload = await JwtAdapter.validateToken<{id:number}>(token);

        if(!payload) return res.status(401).json({message : "Invalid token"});

        const user = await Usuarios.findOne({
            where : { id : payload.id}
        });

        if (!user) return res.status(401).json({ message: "Invalid user" });

        req.body.userSession = user;
        next();
        
    };
};