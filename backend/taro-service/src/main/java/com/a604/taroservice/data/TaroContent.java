package com.a604.taroservice.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "taro_content")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaroContent {

    @Id
    @Column(nullable=false)
    private Integer seq;

    @Column(nullable = false)
    private short cardSeq;
    @Column(nullable = false)
    private String content;
}
