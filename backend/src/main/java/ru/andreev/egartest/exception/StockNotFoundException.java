package ru.andreev.egartest.exception;

public class StockNotFoundException extends RuntimeException {
    public StockNotFoundException(Long id) {
        super("Stock was not found " + id);
    }
}
