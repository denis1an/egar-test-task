package ru.andreev.egartest.domain.dto;

import java.util.List;

public class GraphDataDto {
    private String name;
    private List<String> date;
    private List<Double> cost;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }

    public List<Double> getCost() {
        return cost;
    }

    public void setCost(List<Double> cost) {
        this.cost = cost;
    }
}
