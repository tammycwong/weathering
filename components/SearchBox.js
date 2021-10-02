import React, { useState } from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function onChange(e) {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          matchingCities.push(city);
        }
      }
    }
    setResults(matchingCities);
    // console.log(matchingCities);
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={onChange}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.id}>
                <Link href={`/location/${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`}>
                  <a>
                    {city.name}
                    {city.state ? `, ${city.state}` : null}
                    <span>({city.country})</span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No Results</li>
          )}
        </ul>
      )}
    </div>
  );
}

//  * LOGIC:
//  1. onChange (as user is typing) setState to value in input
//  2. if at least 3 characters are in the SearchBox:
//      1. create empty array for the matching cities
//      2. for loop (for each city in the cities object)
//      3. if matching cities are 5 or more, break/end
//      4. CONVERT FOR CASE SENSITIVITY - RESULTS AND INPUT
//  3. console.log to see the results
//  4. create state to hold results
//  5. replace console.log to setResults(matchingCities);
//  6. show results on page -> .map:

//  * conditional logic:
//  if query length is more than 3 && exists (more than 0 results)
//  return list of results => .map to display the results:
//      - each city result should be a link
//           - a tag between Link component
//           - some cities have a state tied to it- write conditional:
//             - if there is a state, render `, ${city.state}` : ''
//             - if not, render nothing
//  if not, render "no reslts found 

