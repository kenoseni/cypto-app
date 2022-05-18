import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";

export const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return "Loading...";

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Crypto Coins" onChange={handleSearch} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank} ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={crypto.iconUrl}
                    alt={crypto.name}
                  />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
