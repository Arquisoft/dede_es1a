
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class BuyProductSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")
  
  private val headers_0 = Map(
  		"If-None-Match" -> """W/"719-FfIKvHMD7sFEkXdgMXo0/k+QkWA"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """W/"c69-X9XLLZoHUaE/3Z5i9VqBDNKZ9c0"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_2 = Map("Upgrade-Insecure-Requests" -> "1")
  
  private val headers_3 = Map(
  		"Accept" -> "*/*",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_5 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """W/"234-VAVAUQvkLzkQT4ZmkJqvULzjwo8"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("BuyProductSimulation")
    .exec(
      http("request_0")
        .get("/catalog")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1)
        )
    )
    .pause(2)
    .exec(
      http("request_2")
        .get("/product/1")
        .headers(headers_2)
        .resources(
          http("request_3")
            .get("http://" + uri1 + ":5000/api/rocks/1")
            .headers(headers_3)
        )
    )
    .pause(4)
    .exec(
      http("request_4")
        .get("/product/1")
        .headers(headers_0)
        .resources(
          http("request_5")
            .get("http://" + uri1 + ":5000/api/rocks/1")
            .headers(headers_5)
        )
    )
    .pause(3)
    .exec(
      http("request_6")
        .get("/login")
        .headers(headers_2)
    )

	setUp(scn.inject(rampUsers(10000) during(60 seconds))).protocols(httpProtocol)
}
