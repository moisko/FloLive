package com.flolive.rgb.service;

import com.flolive.rgb.dto.RgbColor;
import com.flolive.rgb.mapper.RgbMapper;
import com.flolive.rgb.repository.RgbRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RgbService {
    private final RgbRepository rgbRepository;
    private final RgbMapper rgbMapper;

    @Transactional
    public RgbColor save(RgbColor rgbColor) {
        return rgbMapper.toRgbColor(rgbRepository.save(rgbMapper.toRgbEntity(rgbColor)));
    }
}
