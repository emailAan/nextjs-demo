package com.avinty.epd.personalia;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonaliaRepository extends MongoRepository<Personalia, String> {

	public Personalia findByFirstName(String firstName);

	public List<Personalia> findByLastName(String lastName);

}