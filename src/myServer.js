import moment from "moment-jalaali";
import random from "lodash/random";
import faker from "faker";
import {
  createServer,
  RestSerializer,
  Model,
  hasMany,
  belongsTo,
  Response,
  Factory
} from "miragejs";

const CATEGORIES = [
  "مسکن",
  "خوراک و خوار و بار",
  "حمل و نقل",
  "سلامت",
  "پوشاک",
  "بیمه",
  "پس انداز",
  "تفریح",
  "شخصی (آموزشی)",
  "مختلف"
];
const START_DATE = moment("1399/08/01", "jYYYY/jMM/jDD")
  .startOf("day")
  .valueOf();

//export default function makeServer({ environment = "development" } = {}) {

  

//let myServer=
createServer({
 // environment,
  
  models: {
    user: Model.extend({
      entries: hasMany()
    }),
    category: Model.extend({
      entries: hasMany()
    }),
    entry: Model.extend({
      user: belongsTo(),
      category: belongsTo()
    })
  },
  serializers: {
    application: RestSerializer.extend({
      embed: true
    }),
    user: RestSerializer.extend({
      root: false,
      embed: true,
      attrs: ["id", "name", "userName"],
      include: ["entries"]
    }),
    category: RestSerializer.extend({
      root: false,
      embed: true
      // include: ["entries"]
    }),
    entry: RestSerializer.extend({
      root: false,
      embed: true,
      include: ["category"]
    })
  },
  factories: {
    user: Factory.extend({
      name() {
        faker.locale = "fa";
        return faker.name.findName(
          faker.name.firstName(),
          faker.name.lastName()
        );
      },
      userName() {
        faker.locale = "en";
        return faker.internet.userName();
      },
      password: "123456"
    }),
    category: Factory.extend({
      name(i) {
        return CATEGORIES[i % 10];
      }
    }),
    entry: Factory.extend({
      title() {
        faker.locale = "fa";
        return faker.random.words();
      }
    })
  },
  seeds(server) {
    const categories = server.createList("category", 10);
    server.createList("user", 5).forEach(user => {
      server.createList("entry", 20, { user }).forEach(entry =>
        entry.update({
          category: categories[Math.floor(Math.random() * 1000) % 10],
          amount: faker.random.number(),
          date: moment(START_DATE).add(random(29), "days").valueOf()
        })
      );
    });
  },
  routes() {
    this.post("/auth/login", (schema, request) => {
      const { userName, password } = JSON.parse(request.requestBody);
      const user = schema.users.findBy({ userName: userName, password });
      if (!!user) {
        return new Response(200, {}, { user, token: generateToken(user) });
      }
      return new Response(
        404,
        {},
        { message: "نام کاربری یا رمزعبور اشتباه است" }
      );
    });

    this.post("/auth/register", (schema, request) => {
      const body = JSON.parse(request.requestBody);
      const user = schema.users.create(body);
      return new Response(201, {}, { user, token: generateToken(user) });
    });

    this.get("/auth/test", (schema, request) => {
      // return { token: request.requestHeaders.token };
      const JSONStr = decodeURIComponent(
        window.atob(request.requestHeaders.token)
      );
      return JSON.parse(JSONStr);
    });

    this.namespace = "api";

    this.resource("users");
    this.resource("categories");
    this.resource("entries");
    this.get("/categories/:categoryId/entries", (schema, request) => {
      return schema.entries.where({ categoryId: request.params.categoryId });
    });
    this.get("/entries/:timestamp", (schema, request) => {
      const date = moment(+request.params.timestamp);
      return schema.entries.where(entry => date.isSame(entry.date, "day"));
    });
  }
});

//return myServer;

//  };

function generateToken(user) {
  return window.btoa(encodeURIComponent(JSON.stringify(user)));
}


//return createServer();
