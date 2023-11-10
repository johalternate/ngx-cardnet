/**
 * Objeto de configuracion para la interfaz de Checkout.
 * @see https://developers.cardnet.com.do/guias/tokenizacion-autenticacion/#importacion-de-libreria:~:text=establecer%20esta%20propiedad.-,Propiedades%3A,-name
 */
export interface CheckoutProperties {
  /**
   * Nombre que aparece como “Título” del Checkout.
   */
  name?: string;
  /**
   * Email del cliente que se puede precargar.
   */
  email?: string;
  /**
   * URL absoluta de la imagen a utilizarse dentro del Checkout (formato fijo). Imágenes aceptadas: jpg, jpeg, png
   */
  image: string;
  /**
   * Texto a mostrarse en el botón de pago (el keyword #monto# es sustituido
   * por el monto si este es informado).
   */
  button_label?: string;
  /**
   * Descripción del pago a realizarse.
   */
  description?: string;
  /**
   * Moneda del pago (ver tabla de monedas).
   */
  currency?: string;
  /**
   * Monto del pago (solo para informar al usuario, el monto real se informa
   * server to server en la operación Purchase).
   */
  amount?: string;
  /**
   * Lenguaje de la interfaz.
   * Si no se establece se obtiene de la configuración del browser.
   */
  lang?: string;
  /**
   * Identificador del formulario web donde se manejan los datos de la
   * compra actual. Este dato es requerido ya que se utilizará para
   * informar el token generado por la aplicación a partir de la tarjeta
   * o medio de pago ingresado por el usuario.
   */
  form_id: string;
  /**
   * Si se establece, el checkout pasa directamente a la captura de tarjeta.
   */
  checkout_card?: string;
  /**
   * Si esta propiedad se establece en “true” la imagen y el título en la
   * ventana del formulario se ocultarán.
   */
  empty?: boolean | 'true' | 'false';
  /**
   * Propiedad que permite establecer el comportamiento de la librería
   * PWCheckout una vez que se recibe el Token.
   *
   * Si esta propiedad es establecida en “false” el formulario no será
   * enviado automáticamente.
   *
   * El valor por defecto es “true”, por lo cual si esta propiedad no es
   * establecida, el formulario será enviado automáticamente al recibir
   * el Token del medio de pago.
   */
  autoSubmit?: boolean | 'true' | 'false';

  paymentMediaId?: any;
  issuerBank?: any;
}
