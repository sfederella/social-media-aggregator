import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';
import logoTransitar from "assets/img/logo-color-transitar.png";
import styles from "./Styles.jsx";
import { CustomDate } from "utils/Utils.js"

// Create Document Component
const VoucherTemplate = ({data, ...props}) => {
  const {
    type,
    destination,
    date,
    clients,
    operator,
    address,
    telephone,
    cellPhone,
    cantPax,
    arrivalDate,
    departureDate,
    details,
    flights,
    flightsReservationCode,
    contact,
    reservationCode,
    notes
  } = data;
  
  console.log('templateProps',data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View style={styles.col30}>
            <Image
              style={styles.logo}
              src={logoTransitar}
              />
            <Text style={[styles.sublabel,styles.textCenter, styles.imageCaption]}>
              EVT Legajo nº 15254  Disposición 1287
            </Text>
          </View>
          <View style={[styles.col40, styles.textCenter, styles.title]}>
            <Text style={styles.uppercase}>{`VOUCHER - ${type.desc}`}</Text>
            <Text style={styles.uppercase}>{destination.desc}</Text>
          </View>
          <View style={[styles.col30,styles.textRight,styles.sublabel, styles.upperInfo]}>
            <Text>Virrey del Pino 2686 Piso 2 Oficina A</Text>
            <Text>Capital Federal (1426) Buenos Aires Argentina</Text>
            <Text>Tel: 54-11-4781-9444</Text>
            <Text>Fax: 54-11-4781-9444</Text>
            <Text>E-mail: hernan@transitarviajes.com.ar</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Fecha</Text>
          </View>
          <View style={styles.col70}>
            <Text>{new CustomDate(date).format("dd/MM/aaaa")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>A</Text>
          </View>
          <View style={styles.col70}>
            <Text>{operator.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Dirección</Text>
          </View>
          <View style={styles.col70}>
            <Text>{address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Teléfono</Text>
          </View>
          <View style={styles.col30}>
            <Text>{telephone}</Text>
          </View>
          <View style={[styles.col20,styles.strong]}>
            <Text>Celular</Text>
          </View>
          <View style={styles.col30}>
            <Text>{cellPhone}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Pasajeros</Text>
          </View>
          <View style={styles.col70}>
            <Text>{clients.map(c=>c.name).join(' & ')}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Cant Personas</Text>
          </View>
          <View style={styles.col70}>
            <Text>{cantPax}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Fecha Llegada</Text>
          </View>
          <View style={styles.col30}>
            <Text>{new CustomDate(arrivalDate).format("dd/MM/aaaa")}</Text>
          </View>
          <View style={[styles.col20,styles.strong]}>
            <Text>Fecha Salida</Text>
          </View>
          <View style={styles.col30}>
            <Text>{new CustomDate(departureDate).format("dd/MM/aaaa")}</Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={styles.col100}>
            <Text style={styles.strong}>Servicios</Text>
            <View style={styles.details}>
              <View style={styles.detailHeaderRow}>
                <View style={[styles.detailHeader,styles.col15]}>
                  <Text>Fecha</Text>
                </View>
                <View style={[styles.detailHeader,styles.col50]}>
                  <Text>Servicio</Text>
                </View>
                <View style={[styles.detailHeader,styles.col5]}>
                  <Text>Pax</Text>
                </View>
                <View style={[styles.detailHeader,styles.col10]}>
                  <Text>Tipo</Text>
                </View>
                <View style={[styles.detailHeader,styles.col20]}>
                  <Text>Horario Pick-Up</Text>
                </View>
              </View>
              {details.map((d,key) => {
                return (
                  <View key={key} style={styles.detailRow}>
                    <View style={[styles.detailField,styles.col15]}>
                      <Text>{new CustomDate(d.date).format("dd/MM/aaaa")}</Text>
                    </View>
                    <View style={[styles.detailField,styles.col50]}>
                      <Text>{d.detail.desc}</Text>
                    </View>
                    <View style={[styles.detailField,styles.col5]}>
                      <Text>{d.pax}</Text>
                    </View>
                    <View style={[styles.detailField,styles.col10]}>
                      <Text>{d.type.desc}</Text>
                    </View>
                    <View style={[styles.detailField,styles.col20]}>
                      <Text>{d.pickupTime}</Text>
                    </View>
                  </View>
              )})}
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col20,styles.strong]}>
            <Text>Vuelos</Text>
          </View>
          <View style={styles.col30}>
            <Text>{flights}</Text>
          </View>
          <View style={[styles.col30,styles.strong]}>
            <Text>Codigos Reserva Vuelos</Text>
          </View>
          <View style={styles.col20}>
            <Text>{flightsReservationCode}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col30,styles.strong]}>
            <Text>Reserva confirmada por</Text>
          </View>
          <View style={styles.col20}>
            <Text>{contact}</Text>
          </View>
          <View style={[styles.col30,styles.strong]}>
            <Text>Codigo Reserva</Text>
          </View>
          <View style={styles.col20}>
            <Text>{reservationCode}</Text>
          </View>
        </View>
        {notes ? (
          <View style={styles.row}>
            <View style={[styles.col30,styles.strong]}>
              <Text>Nota</Text>
            </View>
            <View style={styles.col70}>
              <Text>{notes}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.row}>
          <View style={[styles.col100, styles.sublabel, styles.textJustify]}>
            <Text><Text style={styles.strong}>Observaciones:</Text> Reserva prepaga por Transitar Viajes y Turismo. En caso de desencuentro el celular de emergencia de ZIGZAG TRAVEL es +54-294-15-453-4000. Los servicios de traslados de Aeropuerto tendran una espera maxima de una (1/2) hora.  Estar listos en el Lobby del hotel en los horarios que corresponda para cada excursión. La empresa no se responsabiliza por demoras ocasionadas por los pasajeros.  Todos los extras a cargo de los pasajeros.</Text>								
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col100]}>
            <Image
              style={styles.footerImage}
              src={`/api/destinations/images/${destination._id}`}
              />
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default VoucherTemplate;