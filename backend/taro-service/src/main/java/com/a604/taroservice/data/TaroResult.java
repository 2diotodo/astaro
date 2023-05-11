package com.a604.taroservice.data;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seq;

    @Column(nullable = false)
    private Long memberSeq;

    @Size(max = 20)
    @Column(nullable = false)
    private String category;

    @Size(max = 200)
    private String contentInput;

    @Column(nullable = false)
    private String cardSeqList;

    @Column(columnDefinition = "TEXT")
    private String resultList;

    @Column(columnDefinition = "TEXT")
    private String imgUrl;

    @Column(columnDefinition = "TEXT")
    private String story;
    @Column(columnDefinition = "TEXT")
    private String videoUrl;

    @ColumnDefault("0")
    private boolean isDangerous;

    @ColumnDefault("0")
    private boolean isDeleted;

    private LocalDate createdAt;

    @ColumnDefault("0")
    private boolean isPublic;

}
