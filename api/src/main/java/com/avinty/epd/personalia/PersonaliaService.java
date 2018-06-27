package com.avinty.epd.personalia;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/personalia")
class PersonaliaService {

	@Autowired
	private PersonaliaRepository repository;

	@Autowired
	private KafkaTemplate<String, Personalia> kafkaTemplate;

	@Value("${app.topic.client}")
	private String topic;
	
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public void save(@RequestBody Personalia personalia) {
		repository.save(personalia);
		kafkaTemplate.send(topic, personalia);
	}

	@GetMapping("/all")
	public List<Personalia> get() {
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Personalia get(@PathVariable String id) {
		Optional<Personalia> res = repository.findById(id);
		
		return res.isPresent() ? res.get() : null;
	}
}
