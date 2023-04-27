package com.a604.taroservice.data;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "card_info")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardInfo {

    @Id
    @Column(nullable = false)
    private Short seq;

    @Size(max=20)
    @Column(nullable = false)
    private String name;

    @ColumnDefault("0")
    private boolean orient;

    @Size(max=100)
    private String keyword;

    private String meaning;

    @Size(max=100)
    @Column(name="image_url")
    private String imageUrl;

    private Short good;

    private Short bad;
}
