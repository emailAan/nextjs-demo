package com.avinty.epd.caseload;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class ClientService {

	@Autowired
	private ClientRepository repository;

	@RequestMapping(path = "/caseload")
	public List<Client> caseload() {
		return repository.findAll();
	}
	
}
