package ru.andreev.egartest.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.andreev.egartest.domain.dto.GraphDataDto;
import ru.andreev.egartest.domain.dto.StockDto;
import ru.andreev.egartest.domain.entity.Stock;
import ru.andreev.egartest.domain.mapper.StockMapper;
import ru.andreev.egartest.exception.StockNotFoundException;
import ru.andreev.egartest.repository.StockRepository;
import ru.andreev.egartest.service.StockService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {

    private final StockMapper stockMapper;
    private final StockRepository stockRepository;

    private static final String CREATE_SUCCESSFUL = "Stock was created successfully.";
    private static final String UPDATE_SUCCESSFUL = "Stock was updated successfully";
    private static final String DELETE_SUCCESSFUL = "Stock was deleted successfully";

    private static final String UPDATE_BAD_REQUEST = "Invalid stock id";

    public StockServiceImpl(StockMapper stockMapper, StockRepository stockRepository) {
        this.stockMapper = stockMapper;
        this.stockRepository = stockRepository;
    }

    @Override
    public ResponseEntity<?> findAll() {
        List<StockDto> stockDtoList = stockRepository.findAll()
                .stream().map(stockMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(stockDtoList);
    }

    @Override
    public ResponseEntity<?> save(StockDto stockDto) {
        Stock stock = stockMapper.toEntity(stockDto);
        stockRepository.save(stock);
        return ResponseEntity.status(HttpStatus.CREATED).body(CREATE_SUCCESSFUL);
    }

    @Override
    public ResponseEntity<?> update(Long id, StockDto stockDto) {
        Stock stockFromDB = stockRepository.findById(id)
                .orElseThrow(() -> new StockNotFoundException(id));

        Stock newStock = stockMapper.toEntity(stockDto);

        if(!newStock.getId().equals(stockFromDB.getId())){
            return ResponseEntity.badRequest().body(UPDATE_BAD_REQUEST);
        }
        stockRepository.save(newStock);
        return ResponseEntity.ok().body(UPDATE_SUCCESSFUL);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new StockNotFoundException(id));

        stockRepository.delete(stock);
        return ResponseEntity.ok().body(DELETE_SUCCESSFUL);
    }

    @Override
    public ResponseEntity<?> getGraphInfo() {

        List<Stock> stockList = stockRepository.findAll();
        Map<String, List<Stock>> map = new HashMap<>();

        for (Stock stock : stockList){
            String name = stock.getName();
            if(!map.containsKey(name)){
                map.put(name,new ArrayList<>(List.of(stock)));
            }else {
               List<Stock> list =  map.get(name);
               list.add(stock);
            }
        }

        List<GraphDataDto> getGraphInfo = new ArrayList<>();

        for (List<Stock> stocks : map.values()){
            List<String> dates = new ArrayList<>();
            List<Double> prices = new ArrayList<>();

            for (Stock stock: stocks) {
                dates.add(stock.getDate().toString());
                prices.add(stock.getPrice());
            }

            GraphDataDto graphDataDto = new GraphDataDto();
            graphDataDto.setName(stocks.get(0).getName());
            graphDataDto.setDate(dates);
            graphDataDto.setCost(prices);


            getGraphInfo.add(graphDataDto);
        }
        return ResponseEntity.ok().body(getGraphInfo);
    }
}
