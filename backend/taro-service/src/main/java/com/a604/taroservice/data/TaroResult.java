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
    @Column(name="member_seq")
    private Long memberSeq;
    @Size(max = 20)
    private String category;
    @Size(max = 200)
    @Column(name="content_input")
    private String contentInput;
    @Column(name="seq_list")
    private String seqList;
    @Column(name="content_list")
    private String contentList;
    @Column(name="img_list")
    private String imgList;
    @Column(name="is_dangerous")
    @ColumnDefault("0")
    private boolean isDangerous;
    @Column(name="is_deleted")
    @ColumnDefault("0")
    private boolean isDeleted;
    @Column(name="created_at")
    private LocalDate createdAt;
    @Column(name="updated_at")
    private LocalDate updatedAt;
    @Column(name="is_public")
    @ColumnDefault("0")
    private boolean isPublic;

}
