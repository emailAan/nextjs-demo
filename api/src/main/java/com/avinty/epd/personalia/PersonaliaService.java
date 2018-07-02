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

import com.avinty.epd.caseload.Client;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = {"http://localhost:80","http://localhost:3000","http://localhost:8080","http://localhost"})
@RequestMapping(path = "/personalia")
class PersonaliaService {

	@Autowired
	private PersonaliaRepository repository;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	@Value("${app.topic.client}")
	private String topic;

	@PostMapping
	@CrossOrigin(origins = {"http://localhost:80","http://localhost:3000","http://localhost:8080","http://localhost"})
	public void save(@RequestBody Personalia personalia) {
		repository.save(personalia);

		ObjectMapper mapper = new ObjectMapper();

		try {
			String p = mapper.writeValueAsString(personalia);
			kafkaTemplate.send(topic, p);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

	}

	@GetMapping("/all")
	public List<Personalia> get() {
		return repository.findAll();
	}

	@GetMapping("/{id}")
	@CrossOrigin(origins = {"http://localhost:80","http://localhost:3000","http://localhost:8080","http://localhost"})
	public Personalia get(@PathVariable String id) {
		Optional<Personalia> res = repository.findById(id);

		return res.isPresent() ? res.get() : null;
	}
}
