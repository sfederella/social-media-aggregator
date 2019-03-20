import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Col Widths
  col5: {
    width: '5%'
  },
  col10: {
    width: '10%'
  },
  col15: {
    width: '15%'
  },
  col20: {
    width: '20%'
  },
  col25: {
    width: '25%'
  },
  col30: {
    width: '30%'
  },
  col35: {
    width: '35%'
  },
  col40: {
    width: '40%'
  },
  col45: {
    width: '45%'
  },
  col50: {
    width: '50%'
  },
  col55: {
    width: '55%'
  },
  col60: {
    width: '60%'
  },
  col65: {
    width: '65%'
  },
  col70: {
    width: '70%'
  },
  col75: {
    width: '75%'
  },
  col80: {
    width: '80%'
  },
  col85: {
    width: '85%'
  },
  col90: {
    width: '90%'
  },
  col95: {
    width: '95%'
  },
  col100: {
    width: '100%'
  },
  
  page: {
    fontFamily: 'Helvetica',
    fontSize: '11',
    padding: 20,
    paddingTop: 30
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
  strong: {
    fontFamily: 'Helvetica-Bold'
  },
  imageCaption: {
    margin: '5pt',
    fontSize: '8'
  },
  sublabel: {
    fontSize: '8'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  textJustify: {
    textAlign: 'justify'
  },
  details: {
    borderLeft: '1pt',
    borderTop: '1pt',
    marginTop: '5pt',
    marginBottom: '5pt',
  },
  detailHeaderRow: {
    flexDirection: 'row',
    borderBottom: '1pt',
  },
  detailRow: {
    flexDirection: 'row',
    borderBottom: '1pt'
  },
  detailHeader: {
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    borderRight: '1pt',
    padding: '1pt',
    paddingTop: '4pt'
  },
  detailField: {
    textAlign: 'center',
    borderRight: '1pt',
    padding: '1pt',
    paddingTop: '4pt'
  },

  title: {
    fontSize: 14,
    paddingRight: '10pt',
    marginTop: '15pt'
  },
  logo: {
    height: '48pt',
    margin: 'auto'
  },
  upperInfo: {
    marginTop: '10pt'
  },
  footerImage: {
    maxHeight: '350pt',
    marginTop: '10pt',
  }
});

export default styles