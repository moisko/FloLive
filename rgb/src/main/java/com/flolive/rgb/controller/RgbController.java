package com.flolive.rgb.controller;

import com.flolive.rgb.dto.RgbColor;
import com.flolive.rgb.service.RgbService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class RgbController {

    private final RgbService rgbService;

    @MessageMapping("/rgb")
    @SendTo("/topic/rgbColor")
    public RgbColor rgb(RgbColor rgbColor) {
        return rgbService.save(rgbColor);
    }
}
