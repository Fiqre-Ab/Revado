package com.revado.exception;

public class LoginFail extends RuntimeException {
    public LoginFail(String message) {
        super(message);
    }
}
