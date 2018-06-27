package com.avinty.epd.personalia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/personalia")
class PersonaliaService {

	@Autowired
	private PersonaliaRepository repository;

	@PostMapping
	public void save(@RequestBody Personalia personalia) {
		repository.save(personalia);
	}

}
