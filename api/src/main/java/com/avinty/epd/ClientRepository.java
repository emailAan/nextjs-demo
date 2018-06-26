package com.avinty.epd;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository  extends MongoRepository<Client, String> {

    public Client findByFirstName(String firstName);
    public List<Client> findByLastName(String lastName);

}