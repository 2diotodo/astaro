package com.a604.taroservice.data;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name="taro_result")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaroResult {
    @Id
    @Column(nullable=false)
    private Long seq;

    private Long memberSeq;
    @Size(max = 20)
    private String category;
    @Size(max = 200)
    private String contentInput;

    private String seqList;

    private String contentList;

    private String imgList;

    @ColumnDefault("0")
    private boolean isDangerous;

    @ColumnDefault("0")
    private boolean isDeleted;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    @ColumnDefault("0")
    private boolean isPublic;

}
