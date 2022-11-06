import { User } from './../users/users.service';
import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { json } from 'express';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    //AuthGuard('jwt')
    //@UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Body() user : User) {
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}