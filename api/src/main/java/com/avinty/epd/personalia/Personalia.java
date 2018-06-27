package com.avinty.epd.personalia;

import org.springframework.data.annotation.Id;

public class Personalia {

	@Id
	public String id;

	public String firstName;
	public String lastName;
	

	public Personalia() {}

	public Personalia(String firstName, String lastName) {
	        this.firstName = firstName;
	        this.lastName = lastName;
	    }

	@Override
	public String toString() {
		return String.format("Customer[id=%s, firstName='%s', lastName='%s']", id, firstName, lastName);
	}
}