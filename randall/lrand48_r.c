#include <cpuid.h>
#include <immintrin.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "lrand48_r.h"

struct drand48_data buffer = {0};
long int first;
long int second;

void
lrand48_ralt_init (void) {
  srand48_r(time(NULL), &buffer);
}

unsigned long long
lrand48_ralt (void){
  lrand48_r(&buffer, &first);
  lrand48_r(&buffer, &second);
  unsigned long long int result;
  result = ((unsigned long long int) first | ((unsigned long long int) second << 32));
  return result;
}
  

void
lrand48_ralt_fini (void){}
