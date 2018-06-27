package com.avinty.epd.personalia;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonaliaRepository extends MongoRepository<Personalia, String> {

	public Personalia findByFirstName(String firstName);

	public Optional<Personalia> findById(String id);

}