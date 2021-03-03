package ru.andreev.egartest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.andreev.egartest.domain.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

}
