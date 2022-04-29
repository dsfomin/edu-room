package com.backend.eduroom.model;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonView({View.UserView.Internal.class, View.CourseView.IdName.class})
public class PageResponse<T> {
    
    private List<T> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private String order;
    private String sortBy;

    @Override
    public String toString() {
        return "PageResponse{" +
                "content=" + content +
                ", pageNo=" + pageNo +
                ", pageSize=" + pageSize +
                ", totalElements=" + totalElements +
                ", order='" + order + '\'' +
                ", sortBy='" + sortBy + '\'' +
                ", totalPages=" + totalPages +
                '}';
    }
}
