import { div, form, input, button, a, span, p, img, h2, h3, small } from '@cycle/dom'
import { formGroup, yaml, qruri, amountField } from './util'

const recv = ({ amtData }) =>
  form({ attrs: { do: 'new-invoice' } }, [
    h2('Request payment')
  , formGroup('Payment amount', amountField(amtData))

  , formGroup('Description (optional)'
    , input('.form-control.form-control-lg', { attrs: { type: 'text', name: 'description' } })
    , 'Embedded in the QR and presented to the payer.')

  , button('.btn.btn-lg.btn-primary', { attrs: { type: 'submit' } }, 'Request')
  , ' '
  , a('.btn.btn-lg.btn-secondary', { attrs: { href: '#/' } }, 'Cancel')
  ])

const invoice = inv => qruri(inv).then(qr => ({ unitf, conf: { expert } }) => div('.waiting-payment', [
  div('.row', [
    div('.col-sm-6.text-center', [
      h2('Waiting for payment')
    , inv.msatoshi !== 'any' ? h3('.toggle-unit', unitf(inv.msatoshi)) : ''
    , small('.d-none.d-sm-block.text-muted.break-all.mt-3', inv.bolt11)
    ])
  , div('.col-sm-6.text-center.text-sm-right', [
      img('.qr', { attrs: { src: qr } })
    , small('.d-block.d-sm-none.text-center.text-muted.break-all.mt-3', inv.bolt11)
    ])

  ])
, expert ? yaml(inv) : ''
]))

module.exports = { recv, invoice }
