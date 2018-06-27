package com.avinty.epd.caseload;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avinty.epd.personalia.Personalia;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
class CaseloadService {

	@Autowired
	private ClientRepository repository;

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(path = "/caseload")
	public List<Client> caseload() {
		return repository.findAll();
	}

	@KafkaListener(topics = "client.t", groupId = "client")
	public void receive(@Payload String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Client p = mapper.readValue(data, Client.class);
		save(p);
	}

	private void save(Client p) {
		repository.save(p);

	}

}
