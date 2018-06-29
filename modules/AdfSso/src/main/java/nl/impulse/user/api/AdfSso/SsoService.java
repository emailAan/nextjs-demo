package nl.impulse.user.api.AdfSso;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

@Service
public class SsoService {

	@Autowired
	DataSource dataSource;

	public String getSsoUrl(Long client, Long volgnummer, String params, Long module) {

		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withFunctionName("get_adf_module_sso_url");
		simpleJdbcCall.withCatalogName("pack_authentication").withFunctionName("get_adf_module_sso_url");

		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("p_client", client);
		parameters.put("p_volgnummer", volgnummer);
		parameters.put("p_module", module);
		parameters.put("p_parameters", params);
		parameters.put("p_sso", "J");
		String url = simpleJdbcCall.executeFunction(String.class, parameters);

		return url;
	}
}
