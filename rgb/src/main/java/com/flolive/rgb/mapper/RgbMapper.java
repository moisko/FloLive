package com.flolive.rgb.mapper;

import com.flolive.rgb.dto.RgbColor;
import com.flolive.rgb.model.RgbEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RgbMapper {

    RgbColor toRgbColor(RgbEntity entity);

    RgbEntity toRgbEntity(RgbColor rgb);
}
