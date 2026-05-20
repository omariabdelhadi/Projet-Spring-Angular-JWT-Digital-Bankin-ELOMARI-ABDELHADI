package com.abdelhadielomari.banck.enums;

public enum RoleEnum {
    ADMIN("ADMIN"),
    USER("USER");

    private final String value;

    RoleEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
