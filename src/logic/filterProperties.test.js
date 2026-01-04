import filterProperties from "./filterProperties";

const properties = [
  {
    id: "1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
    dateAdded: "2022-10-12",
  },
  {
    id: "2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    location: "Crofton Road, Orpington BR6",
    dateAdded: "2022-09-14",
  },
  {
    id: "3",
    type: "House",
    bedrooms: 4,
    price: 900000,
    location: "High Stree, Chislehurst BR2",
    dateAdded: "2023-06-17",
  },
];


/*test property type*/
test("filters by type only", () => {
  const criteria = { type: "Flat" };
  const result = filterProperties(properties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("2");
});

/*test price range*/
test("filters by price range", () => {
  const criteria = { minPrice: 400000, maxPrice: 900000 };
  const result = filterProperties(properties, criteria);
  expect(result.map((p) => p.id)).toEqual(["1", "3"]);
});

/*test bedroom range*/
test("filters by bedroom range", () => {
  const criteria = { minBedrooms: 4, maxBedrooms: 4 };
  const result = filterProperties(properties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("3");
});

/*test date */
test("filters by date after (dateFrom)", () => {
  const criteria = { dateFrom: new Date("2023-01-01") };
  const result = filterProperties(properties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("3");
});

/*test postcode*/
test("filters by postcode area match", () => {
  const criteria = { postcode: "BR6" };
  const result = filterProperties(properties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("2");
});

/*test combo criteria*/
test("filters by combo criteria (type + bedrooms + price)", () => {
  const criteria = { type: "House", minBedrooms: 4, maxPrice: 900000 };
  const result = filterProperties(properties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("3");
});