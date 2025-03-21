CREATE TABLE carpark(
    carparkid VARCHAR(8) NOT NULL,
    area TEXT NOT NULL,
    development TEXT NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    lottype VARCHAR(2) NOT NULL,
    agency VARCHAR(3) NOT NULL,
    CONSTRAINT pkey PRIMARY KEY (carparkid, lottype)
);

CREATE TABLE carparklots(
    carparkid VARCHAR(8) NOT NULL,
    lottype VARCHAR(2) NOT NULL,
    availablelots INTEGER NOT NULL,
    updatetime TIMESTAMP NOT NULL,
    CONSTRAINT fk_carparkid
        FOREIGN KEY(carparkid, lottype)
            REFERENCES carpark(carparkid, lottype)
);

CREATE TABLE MRTCongestionLevel(
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NOT NULL,
    stationNumber TEXT NOT NULL,
    CrowdLevel TEXT NOT NULL,
    CONSTRAINT pkey PRIMARY KEY (stationNumber)
);

CREATE TABLE MRTStationNumber(
    stationNumber TEXT NOT NULL,
    CONSTRAINT pkey PRIMARY KEY (stationNumber)
        FOREIGN KEY(stationNumber)
            REFERENCES MRTCongestionLevel(stationNumber)
);