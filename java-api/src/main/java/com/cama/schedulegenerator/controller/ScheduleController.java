package com.cama.schedulegenerator.controller;

import com.cama.schedulegenerator.model.Models.GenerateRequest;
import com.cama.schedulegenerator.model.Models.ScheduleResponse;
import com.cama.schedulegenerator.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScheduleController {
  private final ScheduleService scheduleService;
  public ScheduleController(ScheduleService scheduleService) { this.scheduleService = scheduleService; }

  @GetMapping("/health")
  public ResponseEntity<String> health() { return ResponseEntity.ok("CAMA Schedule Generator is running"); }

  @PostMapping("/schedules/generate")
  public ScheduleResponse generate(@Valid @RequestBody GenerateRequest request) {
    return scheduleService.generate(request);
  }
}
