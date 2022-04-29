package com.backend.eduroom.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PaginationRequestParams {
    private Integer pageNo;
    private Integer pageSize;
    private String sortBy;
    private String order;
}
