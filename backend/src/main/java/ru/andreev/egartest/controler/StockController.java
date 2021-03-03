package ru.andreev.egartest.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.andreev.egartest.domain.dto.StockDto;
import ru.andreev.egartest.service.StockService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/stocks", produces = "application/json")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        return stockService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody final StockDto stockDto){
        return stockService.save(stockDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable final Long id,
                                    @RequestBody final StockDto stockDto){
        return stockService.update(id,stockDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id){
        return stockService.delete(id);
    }
}
