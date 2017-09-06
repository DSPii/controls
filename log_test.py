#!/usr/bin/env python
# Evan Widloski - 2017-09-03
# Logging test in gnuradio

from gnuradio import gr
from gnuradio import blocks
from gnuradio import analog

class measure(gr.top_block):
    def __init__(self, output):
        gr.top_block.__init__(self)

        sample_rate = 32e3
        num_samples = 10000
        ampl = 1

        source = analog.sig_source_f(sample_rate, analog.GR_SIN_WAVE, 100, ampl)
        # throttle = blocks.throttle(4, sample_rate)
        head = blocks.head(4, num_samples)
        sink = blocks.file_sink(4, output)

        self.connect(source, head)
        self.connect(head, sink)
        # self.connect(throttle, sink)

if __name__ == '__main__':
    try:
        measure('/tmp/out').run()
    except KeyboardInterrupt:
        pass

