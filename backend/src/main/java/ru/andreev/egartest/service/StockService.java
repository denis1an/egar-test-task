package ru.andreev.egartest.service;

import org.springframework.http.ResponseEntity;
import ru.andreev.egartest.domain.dto.StockDto;
import java.util.List;

public interface StockService {

    ResponseEntity<?> findAll();

    ResponseEntity<?> save(StockDto stockDto);

    ResponseEntity<?> update(Long id, StockDto stockDto);

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> getGraphInfo();
}
