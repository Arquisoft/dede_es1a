
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class GetCatalogSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """W/"719-FfIKvHMD7sFEkXdgMXo0/k+QkWA"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"If-None-Match" -> """W/"c69-X9XLLZoHUaE/3Z5i9VqBDNKZ9c0"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("GetCatalogSimulation")
    .exec(
      http("request_0")
        .get("/catalog")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1),
          http("request_2")
            .get("/catalog")
            .headers(headers_0),
          http("request_3")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1),
          http("request_4")
            .get("/catalog")
            .headers(headers_0),
          http("request_5")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1),
          http("request_6")
            .get("/catalog")
            .headers(headers_0),
          http("request_7")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1)
        )
    )

	setUp(scn.inject(rampUsers(5000) during(60 seconds))).protocols(httpProtocol)
}
