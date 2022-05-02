
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_3 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_4 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_5 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  		"Cache-Control" -> "max-age=0",
  		"If-None-Match" -> """W/"719-FfIKvHMD7sFEkXdgMXo0/k+QkWA"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_6 = Map(
  		"Cache-Control" -> "max-age=0",
  		"If-None-Match" -> """W/"c69-X9XLLZoHUaE/3Z5i9VqBDNKZ9c0"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_8 = Map(
  		"Accept" -> "image/webp,*/*",
  		"If-None-Match" -> """W/"25b30-dOAzOqwFmxRmswj1XSKOanUtYq0""""
  )
  
  private val headers_9 = Map(
  		"If-None-Match" -> """W/"19b-OVXcL7MRPgCDlXwq1G4Dywcv9P4"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_10 = Map(
  		"If-None-Match" -> """W/"348-ERsZ4MULqPGubYZR7D38r3qHVXw"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_11 = Map(
  		"If-None-Match" -> """W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_12 = Map(
  		"If-None-Match" -> """W/"1c8-Z3LCsXkSIk1fpUUgHV9lPA0fs4Q"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("LoginSimulation")
    .exec(
      http("request_0")
        .get("/login")
        .headers(headers_0)
    )
    .pause(16)
    .exec(
      http("request_1")
        .options("http://" + uri1 + ":5000/api/user/login")
        .headers(headers_1)
        .resources(
          http("request_2")
            .options("http://" + uri1 + ":5000/api/users/login")
            .headers(headers_1),
          http("request_3")
            .post("http://" + uri1 + ":5000/api/user/login")
            .headers(headers_3)
            .body(RawFileBody("loginsimulation/0003_request.html"))
            .check(status.is(404)),
          http("request_4")
            .post("http://" + uri1 + ":5000/api/users/login")
            .headers(headers_4)
            .body(RawFileBody("loginsimulation/0004_request.json")),
          http("request_5")
            .get("/catalog")
            .headers(headers_5),
          http("request_6")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=")
            .headers(headers_6)
        )
    )
    .pause(7)
    .exec(
      http("request_7")
        .get("/logout")
        .headers(headers_0)
        .resources(
          http("request_8")
            .get("/static/media/logoRock.997f48c78f72dc5bcc0c.png")
            .headers(headers_8),
          http("request_9")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=magm%C3%A1tica")
            .headers(headers_9),
          http("request_10")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=sedimentaria")
            .headers(headers_10),
          http("request_11")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=todas")
            .headers(headers_11),
          http("request_12")
            .get("http://" + uri1 + ":5000/api/rocks/list/critery?mohsMin=0&mohsMax=10&densityMin=0&densityMax=100&priceMin=0&priceMax=100&nameSubString=&type=%C3%ADgnea")
            .headers(headers_12)
        )
    )

	setUp(scn.inject(rampUsers(5000) during(60 seconds))).protocols(httpProtocol)
}
