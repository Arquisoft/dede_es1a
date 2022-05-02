
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class UseCatalogFiltersSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map("Origin" -> "http://localhost:3000")
  
  private val headers_7 = Map(
  		"If-None-Match" -> """W/"c69-X9XLLZoHUaE/3Z5i9VqBDNKZ9c0"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_10 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """W/"719-FfIKvHMD7sFEkXdgMXo0/k+QkWA"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("UseCatalogFiltersSimulation")
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
    .pause(3)
    .exec(
      http("request_2")
        .get("/catalog?mohsMin=0&mohsMax=3.66&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubstring=&type=todas")
        .headers(headers_0)
        .resources(
          http("request_3")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=3.66&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1)
        )
    )
    .pause(3)
    .exec(
      http("request_4")
        .get("/catalog?mohsMin=0&mohsMax=10&densityMin=0&densityMax=36.32&priceMin=0&priceMax=100&nameSubstring=&type=todas")
        .headers(headers_0)
        .resources(
          http("request_5")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=36.32&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_1)
        )
    )
    .pause(2)
    .exec(
      http("request_6")
        .get("/catalog?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=13.81&nameSubstring=&type=todas")
        .headers(headers_0)
        .resources(
          http("request_7")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_7)
        )
    )
    .pause(5)
    .exec(
      http("request_8")
        .get("/catalog?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubstring=&type=todas")
        .headers(headers_0)
        .resources(
          http("request_9")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_7)
        )
    )
    .pause(3)
    .exec(
      http("request_10")
        .get("/catalog?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubstring=&type=todas")
        .headers(headers_10)
        .resources(
          http("request_11")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_7)
        )
    )

	setUp(scn.inject(rampUsers(10000) during(60 seconds))).protocols(httpProtocol)
}
