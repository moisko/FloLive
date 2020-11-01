package com.flolive.rgb.repository;

import com.flolive.rgb.model.RgbEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RgbRepository extends JpaRepository<RgbEntity, Integer> {
}
