package ru.andreev.egartest.domain.mapper;

import org.springframework.stereotype.Component;
import ru.andreev.egartest.domain.dto.StockDto;
import ru.andreev.egartest.domain.entity.Stock;

@Component
public class StockMapper {

    public StockDto toDto(Stock entity){
        StockDto dto = new StockDto();
        dto.setId(String.valueOf(entity.getId()));
        dto.setName(entity.getName());
        dto.setPrice(String.valueOf(entity.getPrice()));
        dto.setDate(entity.getDate());
        return dto;
    }

    public Stock toEntity(StockDto dto){
        Stock entity = new Stock();
        if(dto.getId() != null && !dto.getId().trim().isEmpty()){
            entity.setId(Long.valueOf(dto.getId()));
        }
        entity.setName(dto.getName());
        entity.setPrice(Double.valueOf(dto.getPrice()));
        entity.setDate(dto.getDate());
        return entity;
    }
}
