package com.a604.taroservice.data;

import lombok.*;

import javax.persistence.*;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @Column(nullable = false)
    private short cardSeq;
    @Column(nullable = false)
    private String content;
}
