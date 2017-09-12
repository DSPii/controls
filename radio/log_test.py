#!/usr/bin/env python
# Evan Widloski - 2017-09-03
# Logging test in gnuradio

from gnuradio import gr
from gnuradio import blocks
from gnuradio import analog
from gnuradio import uhd

tx_serial = "3112474"
rx_serial = "30EF55F"

class measure(gr.top_block):
    def __init__(self, output):
        gr.top_block.__init__(self)


        sample_rate = 64e3
        num_samples = 10000
        ampl = 1

        # source = analog.sig_source_f(sample_rate, analog.GR_SIN_WAVE, 100, ampl)
        source = uhd.usrp_source(device_addr="serial={}".format(rx_serial),
                                 io_type=uhd.io_type.COMPLEX_FLOAT32,
                                 num_channels=1)
        tune_request = uhd.tune_request(2.4e9)
        source.set_samp_rate(sample_rate)
        source.set_antenna("RX2", 0)
        source.set_center_freq(tune_request)

        # throttle = blocks.throttle(4, sample_rate)
        # head = blocks.head(4, num_samples)
        head = blocks.head(gr.sizeof_gr_complex, num_samples)
        # sink = blocks.file_sink(4, output)
        sink = blocks.file_sink(gr.sizeof_gr_complex, output)

        self.connect(source, head, sink)

if __name__ == '__main__':
    try:
        measure('/tmp/out').run()
    except KeyboardInterrupt:
        pass

