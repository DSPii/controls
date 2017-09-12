#!/bin/sh
export VOLK_GENERIC=1
export GR_DONT_LOAD_PREFS=1
export srcdir=/home/evan/resources/controls/radio/gr-tutorial/python
export PATH=/home/evan/resources/controls/radio/gr-tutorial/build/python:$PATH
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH
export PYTHONPATH=/home/evan/resources/controls/radio/gr-tutorial/build/swig:$PYTHONPATH
/home/evan/resources/venv/bin/python2 /home/evan/resources/controls/radio/gr-tutorial/python/qa_multiply_cc.py 
