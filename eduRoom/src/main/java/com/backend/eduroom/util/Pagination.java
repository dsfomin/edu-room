package com.backend.eduroom.util;

import com.backend.eduroom.model.PageResponse;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public class Pagination<T> {
    private final static Sort.Direction DEFAULT_SORT_DIRECTION = Sort.Direction.ASC;

    public PageResponse<T> createPageResponse(JpaRepository<T, Long> repository,
                                              PaginationRequestParams params) {

        Sort.Direction direction = params.getOrder().equals("desc")
                ? Sort.Direction.DESC : DEFAULT_SORT_DIRECTION;

        Pageable pageable = PageRequest.of(
                params.getPageNo(),
                params.getPageSize(),
                Sort.by(direction, params.getSortBy()));

        Page<T> page = repository.findAll(pageable);

        return PageResponse.<T>builder()
                .content(page.getContent())
                .pageNo(page.getNumber())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .pageSize(page.getSize())
                .order(params.getOrder())
                .sortBy(params.getSortBy())
                .build();
    }
}
